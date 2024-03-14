import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
 
export function reformatDate(dateStr: string) {
  const date = new Date(dateStr);

  // Correctly typed options for toLocaleDateString
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  return date.toLocaleDateString('en-US', options);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
