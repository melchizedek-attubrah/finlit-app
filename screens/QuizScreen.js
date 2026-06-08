import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const QUESTIONS = [
  {
    id: '1',
    question: 'What is compound interest?',
    options: [
      'Interest charged only on the original amount',
      'Interest earned on both principal and accumulated interest',
      'A fixed fee charged on every loan',
      'Money automatically saved by your bank',
    ],
    correctIndex: 1,
  },
  {
    id: '2',
    question:
      'If you invest ₵100 at 10% annual compound interest, how much will you have after 1 year?',
    options: ['₵100', '₵105', '₵110', '₵120'],
    correctIndex: 2,
  },
  {
    id: '3',
    question: 'What does the 50/30/20 budgeting rule recommend?',
    options: [
      '50% needs, 30% wants, 20% savings',
      '50% savings, 30% needs, 20% wants',
      'Split your income equally into three parts',
      'Spend your entire income each month',
    ],
    correctIndex: 0,
  },
  {
    id: '4',
    question: 'What is a budget primarily used for?',
    options: [
      'Tracking and planning your income and expenses',
      'Applying for a bank loan',
      'Calculating compound interest',
      'Paying mobile money transfer fees',
    ],
    correctIndex: 0,
  },
  {
    id: '5',
    question:
      'Which factors most affect how quickly compound interest grows?',
    options: [
      'The colour of your bank card',
      'Time and the interest rate',
      'Your name on the bank account',
      'How often you withdraw from an ATM',
    ],
    correctIndex: 1,
  },
];

const TOTAL_QUESTIONS = QUESTIONS.length;

function ResultsScreen({ score, onTryAgain, onBackToLessons }) {
  const passed = score >= 4;
  const percentage = Math.round((score / TOTAL_QUESTIONS) * 100);

  return (
    <View style={styles.resultsContainer}>
      <View style={styles.resultsCard}>
        <Text style={styles.resultsEmoji}>{passed ? '🎉' : '💪'}</Text>
        <Text style={styles.resultsTitle}>
          {passed ? 'Well done!' : 'Keep practicing!'}
        </Text>
        <Text style={styles.resultsScore}>
          {score} / {TOTAL_QUESTIONS}
        </Text>
        <Text style={styles.resultsPercent}>{percentage}% correct</Text>
        <Text style={styles.resultsMessage}>
          {passed
            ? 'Great work! You have a solid grasp of compound interest and budgeting.'
            : 'Review the lessons on compound interest and budgeting, then give it another go.'}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        activeOpacity={0.85}
        onPress={onTryAgain}
      >
        <Text style={styles.primaryButtonText}>Try Again</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.outlineButton}
        activeOpacity={0.75}
        onPress={onBackToLessons}
      >
        <Text style={styles.outlineButtonText}>Back to Lessons</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function QuizScreen() {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const currentQuestion = QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / TOTAL_QUESTIONS) * 100;
  const hasAnswered = selectedIndex !== null;

  const handleSelectAnswer = (index) => {
    if (hasAnswered) return;
    setSelectedIndex(index);
    if (index === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!hasAnswered) return;

    if (currentIndex + 1 >= TOTAL_QUESTIONS) {
      setQuizComplete(true);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedIndex(null);
  };

  const handleTryAgain = () => {
    setCurrentIndex(0);
    setSelectedIndex(null);
    setScore(0);
    setQuizComplete(false);
  };

  const getOptionStyle = (index) => {
    if (!hasAnswered) {
      return selectedIndex === index ? styles.optionSelected : null;
    }

    if (index === currentQuestion.correctIndex) {
      return styles.optionCorrect;
    }

    if (index === selectedIndex && index !== currentQuestion.correctIndex) {
      return styles.optionWrong;
    }

    return null;
  };

  const getOptionTextStyle = (index) => {
    if (!hasAnswered) return null;

    if (
      index === currentQuestion.correctIndex ||
      (index === selectedIndex && index !== currentQuestion.correctIndex)
    ) {
      return styles.optionTextHighlighted;
    }

    return null;
  };

  if (quizComplete) {
    return (
      <View style={styles.container}>
        <SafeAreaView edges={['top']} style={styles.header}>
          <Text style={styles.headerTitle}>Quiz</Text>
          <Text style={styles.headerScore}>Quiz Complete</Text>
        </SafeAreaView>
        <ResultsScreen
          score={score}
          onTryAgain={handleTryAgain}
          onBackToLessons={() => navigation.navigate('Lessons')}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Quiz</Text>
          <View style={styles.scoreBadge}>
            <Text style={styles.scoreBadgeText}>
              Score: {score}/{TOTAL_QUESTIONS}
            </Text>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.questionCard}>
          <Text style={styles.questionNumber}>
            Question {currentIndex + 1} of {TOTAL_QUESTIONS}
          </Text>

          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>

          <Text style={styles.questionText}>{currentQuestion.question}</Text>

          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.optionCard, getOptionStyle(index)]}
                activeOpacity={hasAnswered ? 1 : 0.7}
                onPress={() => handleSelectAnswer(index)}
                disabled={hasAnswered}
              >
                <View style={styles.optionLetter}>
                  <Text style={styles.optionLetterText}>
                    {String.fromCharCode(65 + index)}
                  </Text>
                </View>
                <Text style={[styles.optionText, getOptionTextStyle(index)]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            !hasAnswered && styles.nextButtonDisabled,
          ]}
          activeOpacity={0.85}
          onPress={handleNextQuestion}
          disabled={!hasAnswered}
        >
          <Text style={styles.nextButtonText}>
            {currentIndex + 1 >= TOTAL_QUESTIONS
              ? 'See Results'
              : 'Next Question'}
          </Text>
        </TouchableOpacity>
      </View>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerScore: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.75)',
  },
  scoreBadge: {
    backgroundColor: 'rgba(46, 204, 113, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(46, 204, 113, 0.4)',
  },
  scoreBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2ECC71',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 16,
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#1B2E4B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(27, 46, 75, 0.55)',
    marginBottom: 12,
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: '#E8EDF5',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 24,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2ECC71',
    borderRadius: 4,
  },
  questionText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1B2E4B',
    lineHeight: 32,
    marginBottom: 24,
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionSelected: {
    borderColor: '#2ECC71',
    backgroundColor: 'rgba(46, 204, 113, 0.08)',
  },
  optionCorrect: {
    borderColor: '#2ECC71',
    backgroundColor: '#2ECC71',
  },
  optionWrong: {
    borderColor: '#E74C3C',
    backgroundColor: '#E74C3C',
  },
  optionLetter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EEF2F8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  optionLetterText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1B2E4B',
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    color: '#1B2E4B',
    lineHeight: 22,
  },
  optionTextHighlighted: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    paddingTop: 8,
    backgroundColor: '#F0F4FA',
  },
  nextButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 17,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#2ECC71',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  nextButtonDisabled: {
    backgroundColor: 'rgba(46, 204, 113, 0.4)',
    shadowOpacity: 0,
    elevation: 0,
  },
  nextButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  resultsContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  resultsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    marginBottom: 28,
    shadowColor: '#1B2E4B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  resultsEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1B2E4B',
    marginBottom: 12,
  },
  resultsScore: {
    fontSize: 42,
    fontWeight: '800',
    color: '#2ECC71',
    marginBottom: 4,
  },
  resultsPercent: {
    fontSize: 16,
    color: 'rgba(27, 46, 75, 0.55)',
    marginBottom: 16,
  },
  resultsMessage: {
    fontSize: 15,
    color: 'rgba(27, 46, 75, 0.65)',
    textAlign: 'center',
    lineHeight: 22,
  },
  primaryButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 17,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#2ECC71',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  outlineButton: {
    paddingVertical: 17,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#1B2E4B',
    backgroundColor: 'transparent',
  },
  outlineButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1B2E4B',
  },
});
