import { Forger } from "../../../../src/forger";
import { should } from "@artstesh/it-should";

describe("String factory", () => {
  describe("create()", () => {
    describe("default settings", () => {
      it("correct type", () => {
        const element = Forger.create<string>();
        //
        should().string(typeof element).equals('string');
      });

      it("correct union with null type", () => {
        const element = Forger.create<null | string>()!;
        const element2 = Forger.create<string | null>()!;
        //
        should().string(typeof element).equals('string');
        should().string(typeof element2).equals('string');
      });

      it("correct union with undefined type", () => {
        const element = Forger.create<undefined | string>()!;
        const element2 = Forger.create<string | undefined>()!;
        //
        should().string(typeof element).equals('string');
        should().string(typeof element2).equals('string');
      });

      it("not the same", () => {
        const elements = Forger.create<string[]>();
        //
        should().array(elements).uniq();
      });
    });

    describe("custom settings", () => {
      it("correct length", () => {
        const length = 4;
        //
        const result = Forger.create<string>({ stringLength: length });
        //
        should().string(result).hasLength(length);
      });
      it("only numbers", () => {
        //
        const result = Forger.create<string>({ stringSpecial: false, stringLowCase: false, stringUpCase: false });
        //
        should().string(result!).match(/^\d+$/gm);
      });

      it("only low letters", () => {
        //
        const result = Forger.create<string>({ stringSpecial: false, stringNumbers: false, stringUpCase: false });
        //
        should().string(result!).match(/^[a-z]+$/gm);
      });

      it("only up letters", () => {
        //
        const result = Forger.create<string>({ stringSpecial: false, stringNumbers: false, stringLowCase: false });
        //
        should().string(result!).match(/^[A-Z]+$/gm);
      });

      it("only specials", () => {
        //
        const result = Forger.create<string>({ stringLowCase: false, stringNumbers: false, stringUpCase: false });
        //
        should().string(result!).match(/^[^A-Za-z\d]+$/gm);
      });

      it("empty if all settings false", () => {
        const result = Forger.create<string>({
          stringNumbers: false, stringSpecial: false,
          stringUpCase: false, stringLowCase: false
        })!;
        //
        should().string(result).empty();
      });
    });
  });
});




