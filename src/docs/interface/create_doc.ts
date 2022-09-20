export class CreateDocs {
  title?: string;
  slug?: string;
  name?: string;
  icon?: {
    public_id: string;
    url: string;
  }[];
  desc?: string;
  image?: {
    public_id: string;
    url: string;
  }[];
  demoList?: {
    public_id: string;
    url: string;
  }[];
}
