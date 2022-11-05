export class Validators {
    public static text = (val: string) => {
      return val !== '';
    }
    public static emailOrPhone = (val: string) => {
        return val !== '';
    }

    public static password = (val: string) => {
        return val !== '';
    }
}