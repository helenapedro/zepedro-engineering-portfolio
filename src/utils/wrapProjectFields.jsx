import { wrapNumbersWithClass } from './WrapNumbers';

export const wrapProjectFields = (project, className) => {
  return {
    ...project,
    title: wrapNumbersWithClass(project.title, className),
    placeandyear: wrapNumbersWithClass(project.placeandyear, className),
    description: wrapNumbersWithClass(project.description, className),
    finalDescription: project.finalDescription ? wrapNumbersWithClass(project.finalDescription, className) : '',
    activities: Array.isArray(project.activities)
      ? project.activities.map(activitySection =>
          typeof activitySection === 'string'
            ? wrapNumbersWithClass(activitySection, className)
            : {
                ...activitySection,
                header: wrapNumbersWithClass(activitySection.header || '', className),
                items: Array.isArray(activitySection.items)
                  ? activitySection.items.map(item => wrapNumbersWithClass(item, className))
                  : []
              }
        )
      : []
  };
};
