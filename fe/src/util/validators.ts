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

    public static number = (val: number) => {
        return val>0;
    }

    public static regNo = (val: string) => {
        return val !== '';
    }

    public static year = (val: number) => {
        return val >= 1900 && val <= new Date().getFullYear();
    }
}