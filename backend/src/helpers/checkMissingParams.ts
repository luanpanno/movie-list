interface Field {
  label: string;
  name: string;
}

export function checkMissingParams(body: any, fields: Field[]): string {
  const missingFields: string[] = [];

  fields?.forEach((field) => {
    if (!body[field.name]) {
      missingFields.push(field.label);
    }
  });

  if (missingFields?.length > 0) {
    return `Missing ${
      missingFields?.length > 0 ? 'Params' : 'Param'
    }: ${missingFields?.join(', ')}`;
  }

  return null;
}
