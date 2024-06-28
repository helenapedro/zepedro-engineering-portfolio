import React from "react";

const SkillsBody = ({ data }) => {
  return (
    <tbody>
      {data.map((skill, index) => (
        <tr key={index}>
          <td className="year">{skill.year}</td>
          <td>{skill.skill}</td>
          <td>{skill.level}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default SkillsBody;
