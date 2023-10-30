import { useState, useRef } from "react"
import * as Haptics from 'expo-haptics'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

const fortunes = [
    // add your own fortunes here
    'hmm... looks like there aren\'t any fortunes yet',
]

export default function App() {
    const [showCookie, setShowCookie] = useState(false)
    const [fortune, setFortune] = useState('help yourself to some fortune cookies for the heart')
    const [caption, setCaption] = useState('LONG PRESS BAG FOR COOKIE')
    const [isGettingCookie, setIsGettingCookie] = useState(false)
    const hapticInterval = useRef(null)

    const startHapticFeedback = () => {
        setIsGettingCookie(true)
        console.log(isGettingCookie)
        setCaption('DIG DEEP...')
        hapticInterval.current = setInterval(() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                .then(() => {
                    console.log('haptic feedback')
                })
                .catch((error) => {
                    console.log('error haptic feedback', error)
                })
        }, 10)
    }

    const stopHapticFeedback = () => {
        setIsGettingCookie(false)
        clearInterval(hapticInterval.current)
    }

    const handleBagLongPress = async () => {
        startHapticFeedback()
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }

    const handleBagLongPressOut = async () => {
        stopHapticFeedback()
        setShowCookie(true)
        setCaption('TAP COOKIE FOR FORTUNE')
    }

    const handleBagOnPressIn = async () => {
        stopHapticFeedback()
    }

    const handleCookiePress = async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
        setFortune(randomFortune)
        setCaption('')
    }

    const handleClosePress = () => {
        setFortune('')
        setShowCookie(false)
        setCaption('LONG PRESS BAG FOR COOKIE')
    }

    return (
        <View style={styles.container}>
            <Image source={require('./assets/fortuneCookieTitle01.png')} />

            {showCookie && (
                <TouchableOpacity onPress={handleCookiePress}>
                    <Image
                        source={require('./assets/fortuneCookie01.png')}
                        style={styles.fortuneCookie} />
                </TouchableOpacity>
            )}

            {fortune && (
                <TouchableOpacity style={styles.fortuneModal} onPress={handleClosePress}>
                    <Text style={styles.fortuneText}>{fortune}</Text>
                </TouchableOpacity>
            )}

            {!fortune && (
                <View>
                    <Text style={styles.caption}>
                        {caption}
                    </Text>
                    <TouchableOpacity
                        onLongPress={handleBagLongPress}
                        onPressOut={handleBagLongPressOut}
                        onPressIn={handleBagOnPressIn}>
                        <Image
                            source={require('./assets/fortuneCookieBag04.png')}
                            style={styles.fortuneCookieBag} />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#333',
        padding: 10,
    },
    caption: {
        fontSize: 18,
        margin: 10,
        padding: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#666',
    },
    fortuneCookie: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    fortuneModal: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fortuneText: {
        fontSize: 18,
        color: '#000',
        backgroundColor: '#fff',
        textAlign: 'center',
        margin: 10,
        padding: 10,
        borderStyle: 'solid',
        borderColor: '#555',
        borderWidth: 3,
    },
    fortuneCookieBag: {
        width: 420,
        height: 420,
        marginBottom: 0,
    },
});
