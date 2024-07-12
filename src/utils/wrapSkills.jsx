import React from 'react';
import { wrapNumbersWithClass } from './WrapNumbers';

export const wrapSkillsField = (skills, className) => {
     return skills.map(skill => ({
          ...skill,
          year: wrapNumbersWithClass(skill.year, className),
          skill: wrapNumbersWithClass(skill.skill, className),
     }));
};
