import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LESSONS = [
  {
    id: '1',
    icon: '📈',
    title: 'Compound Interest',
    duration: '12 min',
    difficulty: 'Intermediate',
  },
  {
    id: '2',
    icon: '📱',
    title: 'Mobile Money Fees',
    duration: '8 min',
    difficulty: 'Beginner',
  },
  {
    id: '3',
    icon: '💰',
    title: 'Budgeting Basics',
    duration: '10 min',
    difficulty: 'Beginner',
  },
];

const DIFFICULTY_COLORS = {
  Beginner: '#2ECC71',
  Intermediate: '#F39C12',
  Advanced: '#E74C3C',
};

function LessonCard({ icon, title, duration, difficulty }) {
  return (
    <TouchableOpacity style={styles.lessonCard} activeOpacity={0.8}>
      <View style={styles.lessonIconContainer}>
        <Text style={styles.lessonIcon}>{icon}</Text>
      </View>
      <View style={styles.lessonInfo}>
        <Text style={styles.lessonTitle}>{title}</Text>
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
      <Text style={styles.lessonArrow}>›</Text>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const progress = 30;

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <Text style={styles.greeting}>Good morning! 👋</Text>
        <Text style={styles.userName}>Melchizedek Bright Kafui</Text>
      </SafeAreaView>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.progressCard}>
          <Text style={styles.progressLabel}>Your Learning Journey</Text>
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>
          <View style={styles.progressFooter}>
            <Text style={styles.progressPercent}>{progress}% complete</Text>
            <Text style={styles.progressLessons}>3 of 10 lessons</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Continue Learning</Text>

        {LESSONS.map((lesson) => (
          <LessonCard key={lesson.id} {...lesson} />
        ))}

        <TouchableOpacity style={styles.challengeCard} activeOpacity={0.85}>
          <View style={styles.challengeContent}>
            <Text style={styles.challengeEmoji}>🏆</Text>
            <View style={styles.challengeText}>
              <Text style={styles.challengeTitle}>Daily Challenge</Text>
              <Text style={styles.challengeDescription}>
                Test your knowledge — earn points and keep your streak alive!
              </Text>
            </View>
          </View>
          <Text style={styles.challengeArrow}>›</Text>
        </TouchableOpacity>
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
    paddingBottom: 28,
    paddingTop: 8,
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.75)',
    marginBottom: 4,
  },
  userName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 32,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: -16,
    marginBottom: 28,
    shadowColor: '#1B2E4B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  progressLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1B2E4B',
    marginBottom: 14,
  },
  progressBarTrack: {
    height: 10,
    backgroundColor: '#E8EDF5',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2ECC71',
    borderRadius: 5,
  },
  progressFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2ECC71',
  },
  progressLessons: {
    fontSize: 14,
    color: 'rgba(27, 46, 75, 0.55)',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1B2E4B',
    marginBottom: 14,
  },
  lessonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#1B2E4B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  lessonIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#EEF2F8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  lessonIcon: {
    fontSize: 24,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B2E4B',
    marginBottom: 6,
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
  lessonArrow: {
    fontSize: 22,
    color: 'rgba(27, 46, 75, 0.3)',
    fontWeight: '300',
    marginLeft: 8,
  },
  challengeCard: {
    backgroundColor: '#2ECC71',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#2ECC71',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  challengeContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  challengeEmoji: {
    fontSize: 32,
  },
  challengeText: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  challengeDescription: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 19,
  },
  challengeArrow: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '300',
    marginLeft: 8,
  },
});
