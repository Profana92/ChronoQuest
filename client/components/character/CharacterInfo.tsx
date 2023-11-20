import React from "react";

const CharacterInfo = ({ characterData }) => {
  return (
    <div>
      <p>Health: {characterData.health}</p>
      <p>Class: {characterData.class}</p>
      <p>Companion: {characterData.companion}</p>
      <p>Level: {characterData.level}</p>
      <p>XP: {characterData.xp}</p>
      <p>Str:{characterData.str}</p>
      <p>Dex:{characterData.dex}</p>
      <p>int:{characterData.int}</p>
      <p>cha:{characterData.cha}</p>
      <p>spd:{characterData.spd}</p>
      <p>acc:{characterData.acc}</p>
      <p>Action Points:{characterData.ap}</p>
    </div>
  );
};

export default CharacterInfo;
