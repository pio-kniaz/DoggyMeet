import React from 'react';
import { useNavigate } from 'react-router-dom';
import isArray from 'lodash/isArray';
import { Box, Code, AspectRatio, Image, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { createFilter } from 'chakra-react-select';
import { yupResolver } from '@hookform/resolvers/yup';
import { FixedSizeList as List } from 'react-window';

import cities from '@assets/cities.json';
import { SelectField, CustomButton, TextAreaField } from '@components/shared';
import { isApiError } from '@helpers/index';
import mapImgPlaceholder from '@assets/images/placeholder-map.png';
import { useCreateAnnouncement } from '@queries/announcements/announcements-queries';
import { announcementFormValidationSchema } from './announcementNewFormValidationSchema';
import { ListWrapper } from './AnnouncementNewForm.styles';

const defaultValues = {
  city: null,
  description: '',
};

type FormData = {
  city: string | null;
  description: string;
};

type CityOption = {
  label: string;
  value: string;
};

const options: CityOption[] = cities
  .map((elem) => {
    return {
      label: elem.label,
      value: elem.id,
    };
  })
  .sort((a, b) => (a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1));

const height = 37;

function MenuList({ options: selectOptions, children, maxHeight, getValue }: any) {
  const [value] = getValue();
  const initialOffset = selectOptions.indexOf(value) * height;
  return (
    <List
      height={maxHeight}
      itemCount={children.length}
      itemSize={height}
      initialScrollOffset={initialOffset}
      width="100%"
      style={{
        background: 'white',
      }}
    >
      {({ index, style }) => (
        <div style={style}>
          <ListWrapper>{children[index]}</ListWrapper>
        </div>
      )}
    </List>
  );
}

function AnnouncementNewForm() {
  const {
    control,
    handleSubmit,
    register,
    watch,
    setError,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues,
    resolver: yupResolver(announcementFormValidationSchema),
  });

  const { mutateAsync, isLoading } = useCreateAnnouncement();
  const toast = useToast();
  const navigate = useNavigate();

  const watchCity = watch('city');

  const currentMapPlace = React.useMemo(() => cities.find((city) => city.id === watchCity), [watchCity]);

  const handleOnSubmit = async (values: FormData) => {
    toast.closeAll();
    const selectedCity = cities.find((city) => city.id === values.city);
    if (selectedCity) {
      const payload = {
        city: selectedCity.label,
        coordinates: {
          lat: selectedCity.lat,
          lng: selectedCity.lng,
        },
        description: values.description,
      };
      try {
        const toastId = 'new-announcement-success';
        await mutateAsync(payload);
        reset(defaultValues);
        toast({
          id: toastId,
          position: 'top-right',
          title: 'New announcement has been added.',
          description: '',
          status: 'success',
          duration: 2500,
          isClosable: true,
        });
        navigate('/announcement', {
          replace: true,
        });
      } catch (err: unknown) {
        if (isApiError(err)) {
          if (isArray(err.response?.data?.metaData?.fieldsError)) {
            err.response?.data?.metaData?.fieldsError?.forEach((elem: Record<string, string>, index: number) => {
              const fieldName = Object.keys(elem)[index] as keyof FormData;
              setError(fieldName, {
                type: 'manual',
                message: elem[fieldName],
              });
            });
          } else {
            const toastId = 'new-announcement-error';
            if (!toast.isActive(toastId)) {
              toast({
                id: toastId,
                position: 'top-right',
                title: 'Announcement not created.',
                description: `Unable to create announcement try again.`,
                status: 'error',
                duration: 2500,
                isClosable: true,
              });
            }
          }
        }
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(handleOnSubmit)} autoComplete="off">
      <Box mb="2">
        <SelectField<FormData>
          control={control}
          name="city"
          placeholder="City"
          errors={errors}
          options={options}
          filterOption={createFilter({ ignoreAccents: false })}
          components={{ MenuList }}
        />
      </Box>
      {currentMapPlace && (
        <Box mb="2">
          <AspectRatio ratio={17 / 8}>
            <Image src={mapImgPlaceholder} alt="map" objectFit="cover" />
          </AspectRatio>
          <Code>
            {currentMapPlace?.lat} : LAT
            <br />
            {currentMapPlace?.lng} : LON
          </Code>
        </Box>
      )}
      <Box mb="2">
        <TextAreaField<FormData>
          register={register}
          errors={errors}
          name="description"
          label="Description"
          placeholder="Description"
          minRows={8}
          maxRows={14}
        />
      </Box>
      <CustomButton
        bgGradient="linear(to-r, green.400, green.500, green.600)"
        display="flex"
        mx="auto"
        px="10"
        mt="4"
        colorScheme="green"
        type="submit"
        isLoading={isLoading}
      >
        Add
      </CustomButton>
    </form>
  );
}

export default AnnouncementNewForm;
