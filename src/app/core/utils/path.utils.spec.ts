import PathUtils from './path.utils';

describe('PathUtils', () => {
  const testCases = [
    {url: 'https://loremipsum-dolor/sit/amet/124', expected: '124'},
    {url: 'https://lorem-apsum.dol.amet/sat/rat/1234/pat', expected: 'pat'},
    {url: '/sat/rat/mat', expected: 'mat'}
  ];

  testCases.forEach(({url, expected}) => {
    it(`should extract ${expected} from ${url}`, () => {
      expect(PathUtils.getLastSegment(url)).toEqual(expected);
    });
  });
});
