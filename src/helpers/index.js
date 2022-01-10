const getPayloadWithValidFieldsOnly = (validFields, payload) =>
  Object.entries(payload).reduce(
    (acc, [key, value]) =>
      validFields.includes(key) ? { ...acc, [key]: value } : acc,
    {}
  );

const isAllRequiredFieldsPresent = (fields, payload) =>
  fields.every((field) => Object.keys(payload).includes(field));

module.exports = {
  getPayloadWithValidFieldsOnly,
  isAllRequiredFieldsPresent,
};
