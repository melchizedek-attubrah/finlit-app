import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      <View style={styles.content}>
        <View style={styles.branding}>
          <View style={styles.logoBadge}>
            <Text style={styles.logo}>FinLit</Text>
          </View>

          <Text style={styles.tagline}>
            Empowering Financial Decisions Through Education
          </Text>

          <View style={styles.divider} />

          <Text style={styles.description}>
            Master the money skills every Ghanaian student needs — from
            budgeting and saving to mobile money, investing basics, and
            building lasting financial confidence.
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.getStartedButton}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('MainTabs')}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            activeOpacity={0.75}
            onPress={() => {}}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B2E4B',
  },
  glowTop: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(46, 204, 113, 0.12)',
  },
  glowBottom: {
    position: 'absolute',
    bottom: 120,
    left: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingBottom: 16,
    justifyContent: 'space-between',
  },
  branding: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 24,
  },
  logoBadge: {
    marginBottom: 20,
  },
  logo: {
    fontSize: 58,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: 300,
    marginBottom: 24,
  },
  divider: {
    width: 48,
    height: 3,
    backgroundColor: '#2ECC71',
    borderRadius: 2,
    marginBottom: 24,
  },
  description: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.65)',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
  },
  actions: {
    gap: 14,
    paddingBottom: 8,
  },
  getStartedButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 17,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#2ECC71',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  getStartedText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  loginButton: {
    paddingVertical: 17,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.45)',
    backgroundColor: 'transparent',
  },
  loginText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
});
