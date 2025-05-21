export function isDocumentation(): boolean {
  return process.env.PROJECT_MODULE === 'docs';
}
