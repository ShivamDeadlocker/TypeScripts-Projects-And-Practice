namespace MyNm {
  export namespace Hello {
    export class BasicProgram {
      hello(): void {
        console.log("Hello world");
      }
    }
  }
  let myObj = new Hello.BasicProgram();
}
