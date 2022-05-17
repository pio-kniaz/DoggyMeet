import React from 'react';
import { Box, Code, AspectRatio, Image } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import cities from '@assets/cities.json';
import { createFilter } from 'chakra-react-select';
import { SelectField, CustomButton, TextAreaField } from '@components/shared';
import { FixedSizeList as List } from 'react-window';
import mapImgPlaceholder from '@assets/images/placeholder-map.png';
import { announcementFormValidationSchema } from './announcementFormValidationSchema';
import { ListWrapper } from './AnnouncementForm.styles';

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
    >
      {({ index, style }) => (
        <div style={style}>
          <ListWrapper>{children[index]}</ListWrapper>
        </div>
      )}
    </List>
  );
}

function AnnouncementForm() {
  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues,
    resolver: yupResolver(announcementFormValidationSchema),
  });

  const watchCity = watch('city');

  const currentMapPlace = React.useMemo(() => cities.find((city) => city.id === watchCity), [watchCity]);

  const handleOnSubmit = (values: FormData) => {
    console.log(values);
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
          <AspectRatio ratio={3 / 2}>
            <Image src={mapImgPlaceholder} alt="naruto" objectFit="cover" />
          </AspectRatio>
          <Code>
            {currentMapPlace?.lat} : LAT
            <br />
            {currentMapPlace?.lon} : LON
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
      >
        Add
      </CustomButton>
    </form>
  );
}

export default AnnouncementForm;
