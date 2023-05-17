export interface Repository {
  id: string;
  name: string;
  private: boolean;
  html_url: string;
  languages_url: string;
  languages: Map<string, number>;
  topics: []
}
