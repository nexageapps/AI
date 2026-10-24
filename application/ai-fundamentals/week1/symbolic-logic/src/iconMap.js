import React from 'react';
import {
  FaSearch, FaBook, FaFlask, FaWrench, FaStar, FaCircle,
  FaTrophy, FaThumbsUp, FaFistRaised,
  FaRedo, FaCloudRain, FaSun, FaRainbow, FaPizzaSlice,
  FaDog, FaCat, FaBookOpen, FaGamepad, FaLightbulb,
  FaSmile, FaToggleOn, FaGraduationCap, FaHandPointUp,
  FaLink, FaChartBar, FaBalanceScale, FaBrain,
  FaKey, FaExchangeAlt, FaCube, FaSyncAlt, FaExclamationTriangle,
  FaUsers, FaBaby, FaFemale, FaUserFriends, FaQuestionCircle,
  FaCommentDots, FaCheckCircle, FaTimesCircle,
} from 'react-icons/fa';
import {
  IoSparkles,
} from 'react-icons/io5';
import {
  GiNoodles, GiPartyPopper,
} from 'react-icons/gi';
import {
  MdElderly,
} from 'react-icons/md';
import {
  TbCircleLetterA, TbCircleLetterB,
} from 'react-icons/tb';

// Map old emoji strings to React icon components
const ICON_MAP = {
  // Tab icons
  '🔍': FaSearch,
  '📖': FaBookOpen,
  '🔬': FaFlask,
  '🔧': FaWrench,

  // Difficulty
  '🌟': FaStar,

  // Proposition icons
  '🔵': () => <FaCircle style={{ color: '#3b82f6' }} />,
  '🔴': () => <FaCircle style={{ color: '#ef4444' }} />,
  '🌧️': FaCloudRain,
  '☀️': FaSun,
  '🌈': FaRainbow,
  '🍕': FaPizzaSlice,
  '🍝': GiNoodles,
  '🐕': FaDog,
  '🐈': FaCat,
  '📚': FaBook,
  '🎮': FaGamepad,
  '🔘': FaToggleOn,
  '💡': FaLightbulb,
  '😊': FaSmile,
  '🅰️': TbCircleLetterA,
  '🅱️': TbCircleLetterB,
  '✅': FaCheckCircle,
  '❌': FaTimesCircle,

  // Result / feedback
  '🏆': FaTrophy,
  '👍': FaThumbsUp,
  '💪': FaFistRaised,
  '🔄': FaRedo,
  '🎉': () => <GiPartyPopper />,

  // Learn panel
  '💬': FaCommentDots,
  '🔗': FaLink,
  '📊': FaChartBar,
  '⚖️': FaBalanceScale,
  '🧠': FaBrain,
  '🔓': FaKey,
  '👨‍👩‍👧‍👦': FaUsers,

  // FOL panel
  '👨‍👩‍👧': FaUsers,
  '👶': FaBaby,
  '👩': FaFemale,
  '👵': MdElderly,
  '👫': FaUserFriends,
  '👩‍👧': FaFemale,

  // Equivalence
  '🔀': FaExchangeAlt,
  '📦': FaCube,
  '🔃': FaSyncAlt,
  '⚠️': FaExclamationTriangle,

  // Quiz
  '🤔': FaQuestionCircle,
  '🧐': FaQuestionCircle,
  '🙃': FaRedo,
  '🤨': FaQuestionCircle,
  '💭': FaLightbulb,
  '🧙': IoSparkles,

  // Misc
  '👆': FaHandPointUp,
  '🎓': FaGraduationCap,
  '📋': FaBook,
  '⬜': () => <FaCircle style={{ color: '#d1d5db', fontSize: '0.6em' }} />,
};

/**
 * Get a React icon component for a given emoji string.
 * Returns null if no mapping exists.
 */
export function getIcon(emoji, props = {}) {
  const IconComponent = ICON_MAP[emoji];
  if (!IconComponent) return null;
  return <IconComponent {...props} />;
}

/**
 * Render an icon inline, falling back to the emoji string if no mapping.
 */
export function Icon({ emoji, className, style, size }) {
  const sizeStyle = size ? { fontSize: size } : {};
  const IconComponent = ICON_MAP[emoji];
  if (!IconComponent) return <span className={className} style={{ ...sizeStyle, ...style }}>{emoji}</span>;
  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'center', ...sizeStyle, ...style }}>
      <IconComponent />
    </span>
  );
}

export default ICON_MAP;
