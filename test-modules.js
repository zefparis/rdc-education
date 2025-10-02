import { modulesConfig } from './modulesConfig';
import { dataScienceCourse } from './dataScienceCourse';

console.log('Modules actuels:', modulesConfig.length);
console.log('Premier module:', modulesConfig[0]?.title);
console.log('Nouveau cours Data Science:', dataScienceCourse.title);
console.log('Nombre de sections:', dataScienceCourse.sections?.length || 0);
