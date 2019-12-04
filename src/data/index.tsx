import * as Paths from '@Shared/api/Paths';

export const dropResume = async (): Promise<any> => {
  const res = await fetch(Paths.UPLOAD_RESUME);
  return await res.json();
}