export const defaultNonExistentField = (field: string, defaultValue: any) => ({
  updateMany: {
    filter: { [field]: { $exists: false } },
    update: { $set: { [field]: defaultValue } },
  },
});

export const deleteExistentField = (field: string, unsetValue: 1 = 1) => ({
  updateMany: {
    filter: { [field]: { $exists: true } },
    update: { $unset: { [field]: unsetValue } },
  },
});
