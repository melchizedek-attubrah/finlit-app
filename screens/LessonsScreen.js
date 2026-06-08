import { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FILTERS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const DIFFICULTY_COLORS = {
  Beginner: '#2ECC71',
  Intermediate: '#F39C12',
  Advanced: '#E74C3C',
};

const MODULES = [
  {
    id: 'm1',
    title: 'Module 1: Loans & Interest',
    lessons: [
      {
        id: 'm1-l1',
        title: 'Understanding Interest Rates',
        duration: '10 min',
        difficulty: 'Beginner',
      },
      {
        id: 'm1-l2',
        title: 'Compound Interest Explained',
        duration: '12 min',
        difficulty: 'Intermediate',
      },
      {
        id: 'm1-l3',
        title: 'Loan Repayment Strategies',
        duration: '15 min',
        difficulty: 'Advanced',
      },
    ],
  },
  {
    id: 'm2',
    title: 'Module 2: Saving & Investing',
    lessons: [
      {
        id: 'm2-l1',
        title: 'Why Save Money?',
        duration: '8 min',
        difficulty: 'Beginner',
      },
      {
        id: 'm2-l2',
        title: 'Introduction to Investing',
        duration: '14 min',
        difficulty: 'Beginner',
      },
      {
        id: 'm2-l3',
        title: 'Building an Investment Portfolio',
        duration: '18 min',
        difficulty: 'Advanced',
      },
    ],
  },
  {
    id: 'm3',
    title: 'Module 3: Mobile Money & Bank Fees',
    lessons: [
      {
        id: 'm3-l1',
        title: 'Mobile Money Basics',
        duration: '9 min',
        difficulty: 'Beginner',
      },
      {
        id: 'm3-l2',
        title: 'Understanding Bank & MoMo Fees',
        duration: '11 min',
        difficulty: 'Intermediate',
      },
    ],
  },
  {
    id: 'm4',
    title: 'Module 4: Budgeting Fundamentals',
    lessons: [
      {
        id: 'm4-l1',
        title: 'Creating Your First Budget',
        duration: '10 min',
        difficulty: 'Beginner',
      },
      {
        id: 'm4-l2',
        title: 'The 50/30/20 Rule',
        duration: '12 min',
        difficulty: 'Intermediate',
      },
    ],
  },
];

function LessonCard({ title, duration, difficulty, isLocked }) {
  return (
    <TouchableOpacity
      style={[styles.lessonCard, isLocked && styles.lessonCardLocked]}
      activeOpacity={isLocked ? 1 : 0.8}
      disabled={isLocked}
    >
      <View style={styles.lessonInfo}>
        <Text style={[styles.lessonTitle, isLocked && styles.lessonTitleLocked]}>
          {title}
        </Text>
        <View style={styles.lessonMeta}>
          <Text style={styles.lessonDuration}>{duration}</Text>
          <View
            style={[
              styles.difficultyBadge,
              { backgroundColor: `${DIFFICULTY_COLORS[difficulty]}22` },
            ]}
          >
            <Text
              style={[
                styles.difficultyText,
                { color: DIFFICULTY_COLORS[difficulty] },
              ]}
            >
              {difficulty}
            </Text>
          </View>
        </View>
      </View>
      {isLocked && (
        <View style={styles.lockContainer}>
          <Text style={styles.lockIcon}>🔒</Text>
          <Text style={styles.premiumLabel}>Premium</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function LessonsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredModules = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return MODULES.map((module) => {
      const lessons = module.lessons
        .map((lesson, index) => ({
          ...lesson,
          isLocked: index >= 2,
        }))
        .filter((lesson) => {
          const matchesSearch =
            !query || lesson.title.toLowerCase().includes(query);
          const matchesFilter =
            activeFilter === 'All' || lesson.difficulty === activeFilter;
          return matchesSearch && matchesFilter;
        });

      return { ...module, lessons };
    }).filter((module) => module.lessons.length > 0);
  }, [searchQuery, activeFilter]);

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <Text style={styles.headerTitle}>Lessons</Text>
      </SafeAreaView>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search lessons..."
          placeholderTextColor="rgba(27, 46, 75, 0.4)"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Text style={styles.clearButton}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContainer}
      >
        {FILTERS.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterTab,
              activeFilter === filter && styles.filterTabActive,
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter && styles.filterTextActive,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredModules.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📚</Text>
            <Text style={styles.emptyTitle}>No lessons found</Text>
            <Text style={styles.emptyText}>
              Try adjusting your search or filter
            </Text>
          </View>
        ) : (
          filteredModules.map((module) => (
            <View key={module.id} style={styles.moduleSection}>
              <Text style={styles.moduleTitle}>{module.title}</Text>
              {module.lessons.map((lesson) => (
                <LessonCard key={lesson.id} {...lesson} />
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4FA',
  },
  header: {
    backgroundColor: '#1B2E4B',
    paddingHorizontal: 24,
    paddingBottom: 20,
    paddingTop: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#1B2E4B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1B2E4B',
    padding: 0,
  },
  clearButton: {
    fontSize: 16,
    color: 'rgba(27, 46, 75, 0.4)',
    paddingLeft: 8,
  },
  filterScroll: {
    flexGrow: 0,
    marginTop: 16,
  },
  filterContainer: {
    paddingHorizontal: 20,
    gap: 10,
  },
  filterTab: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E8EDF5',
  },
  filterTabActive: {
    backgroundColor: '#1B2E4B',
    borderColor: '#1B2E4B',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(27, 46, 75, 0.6)',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    marginTop: 16,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  moduleSection: {
    marginBottom: 24,
  },
  moduleTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1B2E4B',
    marginBottom: 12,
  },
  lessonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#1B2E4B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  lessonCardLocked: {
    opacity: 0.75,
    backgroundColor: '#F8FAFC',
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1B2E4B',
    marginBottom: 8,
  },
  lessonTitleLocked: {
    color: 'rgba(27, 46, 75, 0.55)',
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  lessonDuration: {
    fontSize: 13,
    color: 'rgba(27, 46, 75, 0.5)',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  lockContainer: {
    alignItems: 'center',
    marginLeft: 12,
  },
  lockIcon: {
    fontSize: 20,
  },
  premiumLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(27, 46, 75, 0.45)',
    marginTop: 2,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 48,
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B2E4B',
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 14,
    color: 'rgba(27, 46, 75, 0.5)',
    textAlign: 'center',
  },
});
