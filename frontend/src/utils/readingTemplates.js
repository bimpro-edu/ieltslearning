import { 
  getReadingTopicsForCategory as _getReadingTopicsForCategory,
  getReadingTemplateForTopic as _getReadingTemplateForTopic,
  getReadingCategories as _getReadingCategories
} from './loadTemplates.js';

/**
 * Fetches all available reading categories.
 * @returns {Array} A list of category objects, each with a 'key' and 'title'.
 */
export function getReadingCategories() {
  return _getReadingCategories();
}

/**
 * Fetches the topics for a specific reading category.
 * @param {string} categoryKey - The key of the reading category (e.g., 'core-reading-skills').
 * @returns {Array} A list of topic objects, each with a 'key' and 'title'.
 */
export function getReadingTopicsForCategory(categoryKey) {
  return _getReadingTopicsForCategory(categoryKey);
}

/**
 * Fetches the detailed template for a specific reading topic.
 * @param {string} categoryKey - The category of the topic (currently ignored but kept for API consistency).
 * @param {string} topicKey - The key of the topic (e.g., 'true-false-ng').
 * @returns {Object|null} An object containing the topic's title, tips, traps, and predictions, or null if not found.
 */
export function getReadingTemplateForTopic(categoryKey, topicKey) {
  return _getReadingTemplateForTopic(categoryKey, topicKey);
}
