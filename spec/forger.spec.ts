import { Forger, transformerNotAppliedMessage } from '../src/forger';

describe('Forger without the transformer applied', () => {
  it('create throws instead of returning undefined', () => {
    expect(() => Forger.create()).toThrow(transformerNotAppliedMessage);
  });

  it('create with settings throws as well', () => {
    expect(() => Forger.create({ stringLength: 5 })).toThrow(transformerNotAppliedMessage);
  });

  it('createWith throws instead of producing an empty model', () => {
    expect(() => Forger.createWith()).toThrow(transformerNotAppliedMessage);
  });

  it('createWith with settings throws as well', () => {
    expect(() => Forger.createWith({ stringLength: 5 })).toThrow(transformerNotAppliedMessage);
  });
});
