export function RTKGetErrorMessage(error: unknown): string {

  if (
    error instanceof Object &&
    "data" in error &&
    (error as any).data &&
    "message" in (error as any).data &&
    (typeof (error.data as any).message === "string"
    || (error.data as any).message instanceof String)
  ) {

    console.log((error.data as any).message)
    return (error.data as any).message as string;
  } else {
    return "Error occured";
  }
}