
export default function modifyConfig(cfg: any) {
  const angularWebpackPlugin = cfg.plugins.find((plugin: any) => plugin?.constructor?.name === "AngularWebpackPlugin");

  if (!angularWebpackPlugin)
    throw new Error("Could not inject the typescript transformers, because AngularWebpackPlugin not found.");

  addTransformers(angularWebpackPlugin);

  return cfg;
}

export const AngularCustomTransformers = {
  modifyConfig
};

modifyConfig.config = modifyConfig;

function addTransformers(plugin: any)
{
  const originalCreateFileEmitter = (plugin as any).createFileEmitter;

  (plugin as any).createFileEmitter = (builderProgram: any, transformers: any, ...rest: any[]) =>
{
  if (!transformers) transformers = {};
  if (!transformers.before) transformers.before = [];

  const program = builderProgram.getProgram();
  const transformersConfig = ((program.getCompilerOptions() as any).plugins) || [];
  const customTransformers = [];

  for (const entry of transformersConfig.filter((e: any) => !!e.transform))
  {
    const transformerRequire = require(entry.transform);
    const transformer = typeof transformerRequire === "function" ? transformerRequire : transformerRequire.default;
    customTransformers.push(transformer(program));
  }
  transformers.before = [...customTransformers, ...transformers.before!];
  return originalCreateFileEmitter.apply(plugin, [builderProgram, transformers, ...rest,]);
};
}
