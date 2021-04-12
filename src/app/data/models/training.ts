import { Lesson } from './lesson';
import { Features } from './features';

export interface Training {
  id: number;
  name: string;
  image?: string;
  lessons: Lesson[];
  enabledFeatures: Features;
}
