import { DashReplacerPipe } from './dash-replacer.pipe';

describe('DashReplacerPipe', () => {
  let pipe: DashReplacerPipe;

  beforeEach(() => {
    pipe = new DashReplacerPipe();
  });

  it('replace single dash in string', () => {
    const target = 'lorem-ipsum';
    const result = pipe.transform(target);
    expect(result).toBe('lorem ipsum');
  });

  it('replace all dashes in string', () => {
    const target = 'lorem-ipsum-dolor-sit-amet';
    const result = pipe.transform(target);
    expect(result).toBe('lorem ipsum dolor sit amet');
  });
});
