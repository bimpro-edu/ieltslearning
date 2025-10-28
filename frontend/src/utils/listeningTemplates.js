// Utils for loading listening templates and data
import coreSkillsData from '../../../backend/db/listening/core-skills.json';
import questionTypesData from '../../../backend/db/listening/question-types.json';
import testSkillsData from '../../../backend/db/listening/test-skills.json';

const categoryData = {
  'core-skills': coreSkillsData,
  'question-types': questionTypesData,
  'test-skills': testSkillsData
};

export function getListeningCategoryData(categoryKey) {
  return categoryData[categoryKey] || { title: 'Category not found', topics: [] };
}

export function getListeningTemplateForTopic(categoryKey, topicKey) {
  const category = getListeningCategoryData(categoryKey);
  const topic = category.topics?.find(t => t.key === topicKey);
  
  if (!topic) {
    return {
      title: 'No data',
      templates: [],
      mindmap: null,
      tips: [],
      traps: []
    };
  }

  return {
    title: topic.title,
    templates: topic.templates,
    mindmap: topic.mindmap,
    tips: topic.tips,
    traps: topic.traps
  };
}

export function getListeningTopicsForCategory(categoryKey) {
  const category = getListeningCategoryData(categoryKey);
  return category.topics || [];
}