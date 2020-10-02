export const currencyFormatter =  (value, currency ="USD") => 
{
  const  language = "en-US" 
  return value
    ? Intl.NumberFormat(language, { style: "currency", currency }).format(value)
    : "";
}
