export class TemplateUtils {
  public static camelCase(input: string): string {
    return input.replace(/-([a-z])/gi, (all, letter) => letter.toUpperCase());
  }

  public static getInputNameCamelCase(inputName): string {
    const name: string = inputName.charAt(0).toUpperCase() + inputName.slice(1);
    return TemplateUtils.camelCase(name);
  }

  public static getInputFeatureName(inputName): string {
    const name: string = inputName.charAt(0) + inputName.slice(1);
    return TemplateUtils.camelCase(name);
  }
}
