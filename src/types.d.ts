interface ResponseTypes<T> {
  data: T;
  next_page_url: string;
  prev_page_url: string;
  total: number;
}
