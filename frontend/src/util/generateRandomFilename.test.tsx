import { generateRandomFilename } from './generateRandomFilename';

describe('Given no filename', () => {
  const filename = '';

  describe('When randomizing filename', () => {
    const generatedFilename = generateRandomFilename(filename);

    it('Should return an empty string', () => {
      expect(generatedFilename).toEqual(filename);
    });
  });
});

describe('Given no file extension', () => {
  const filename = 'filename';

  describe('When randomizing filename', () => {
    const generatedFilename = generateRandomFilename(filename);

    it('Should return a random filename without file extension', () => {
      expect(generatedFilename).not.toEqual(filename);
      expect(generatedFilename).not.toHaveLength(0);
    });
  });
});

describe('Given a file extension', () => {
  const extension = 'jpg';
  const filename = `filename.${extension}`;

  describe('When randomizing filename', () => {
    const generatedFilename = generateRandomFilename(filename);

    it('Should return a random filename with file extension', () => {
      const generatedFilenameWithoutExtension = generatedFilename
        .split('.')
        .slice(0, -1)
        .join('.');
      const generatedExtension = generatedFilename.split('.')[1];
      expect(generatedFilenameWithoutExtension).not.toEqual(filename);
      expect(generatedFilenameWithoutExtension).not.toHaveLength(0);
      expect(generatedExtension).toEqual(extension);
    });
  });

  describe('When randomizing two filenames', () => {
    const generatedFilename = generateRandomFilename(filename);
    const otherGeneratedFilename = generateRandomFilename(filename);

    it('Should return different filenames', () => {
      expect(generatedFilename).not.toEqual(otherGeneratedFilename);
    });
  });
});

describe('Given a file extension and a name containing a dot', () => {
  const extension = 'jpg';
  const filename = `file.name.${extension}`;

  describe('When randomizing filename', () => {
    const generatedFilename = generateRandomFilename(filename);

    it('Should return a random filename with file extension', () => {
      const generatedFilenameWithoutExtension = generatedFilename
        .split('.')
        .slice(0, -1)
        .join('.');
      const generatedExtension = generatedFilename.split('.')[1];
      expect(generatedFilenameWithoutExtension).not.toEqual(filename);
      expect(generatedFilenameWithoutExtension).not.toHaveLength(0);
      expect(generatedExtension).toEqual(extension);
    });
  });
});
