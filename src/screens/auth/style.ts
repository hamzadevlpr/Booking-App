import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../theme/theme';

export const authBaseStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingVertical: 24,
        paddingBottom: 40,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontFamily: FONTS.BOLD,
        color: COLORS.TEXT,
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 14,
        fontFamily: FONTS.REGULAR,
        color: COLORS.MUTED,
        marginBottom: 32,
    },
    formContainer: {
        marginBottom: 24,
    },
    fieldWrapper: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontFamily: FONTS.SEMI_BOLD,
        color: COLORS.TEXT,
        marginBottom: 8,
    },
    input: {
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 14,
        fontFamily: FONTS.REGULAR,
        backgroundColor: COLORS.INPUT_BG,
        color: COLORS.TEXT,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.INPUT_BG,
        borderRadius: 8,
    },
    passwordInput: {
        flex: 1,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 14,
        fontFamily: FONTS.REGULAR,
        color: COLORS.TEXT,
    },
    eyeButton: {
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ctaButton: {
        backgroundColor: COLORS.PRIMARY,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 22,
    },
    ctaText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: FONTS.SEMI_BOLD,
        paddingVertical: 14,
    },
    orRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginBottom: 20,
        paddingHorizontal: 6,
    },
    orLine: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.BORDER,
    },
    orText: {
        fontSize: 13,
        fontFamily: FONTS.REGULAR,
        color: '#9EA3B4',
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 18,
        marginBottom: 28,
    },
    socialButton: {
        width: 64,
        height: 64,
        borderRadius: 12,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E7E9F1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    socialIcon: {
        width: 32,
        height: 32,
        resizeMode: 'contain',
    },
    termsText: {
        textAlign: 'center',
        fontSize: 14,
        fontFamily: FONTS.REGULAR,
        color: '#8D91A3',
        lineHeight: 22,
        marginHorizontal: 10,
    },
    termsLink: {
        fontFamily: FONTS.SEMI_BOLD,
        color: '#444',
    },

    altPromptRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        marginBottom: 26,
    },
    altPromptText: {
        fontSize: 15,
        fontFamily: 'Poppins-SemiBold',
        color: '#858AA0',
    },
    altPromptLink: {
        fontSize: 15,
        fontFamily: 'Poppins-SemiBold',
        color: COLORS.PRIMARY,
    },
});

export const signInStyles = StyleSheet.create({
    rememberRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
        marginTop: -20,
        paddingHorizontal: 2,
    },
    rememberLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    rememberCircle: {
        width: 26,
        height: 26,
        borderRadius: 13,
        borderWidth: 1.5,
        borderColor: '#D6DDE7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rememberCircleChecked: {
        borderColor: COLORS.PRIMARY,
    },
    rememberCircleInner: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: COLORS.PRIMARY,
    },
    rememberText: {
        fontSize: 15,
        fontFamily: FONTS.REGULAR,
        color: '#6F737C',
    },
    forgotText: {
        fontSize: 15,
        fontFamily: FONTS.REGULAR,
        color: COLORS.DANGER,
    },
});

export const signupStyles = StyleSheet.create({});

export const forgetStyles = StyleSheet.create({});

export const resetStyles = StyleSheet.create({});