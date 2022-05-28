export const validationMessage = {
  email: 'incorrect email format',
  requiredFiled: 'required',
  notEmpty: 'cannot be an empty',
  unHandled: <t>(type: t) => `unhandled ${type}`,
} as const;
