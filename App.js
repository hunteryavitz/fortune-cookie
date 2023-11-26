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
    'Your homemade meals are the tastiest - Your love',
    'I love that you give our chickens a good life - Penelope',
    'I love how artistic and creative you are - Ramona',
    'Your gifts are always so thoughtful - Penelope',
    'I love how adventurous you are when cooking and crafting - Ramona',
    'I love the aromas and flavors you fill our home with - Your love',
    'Movie nights are my favorite - Penelope',
    'Game nights are my favorite - Ramona',
    'I love how you create memories for your family - Your love',
    'Don\'t ever forget you\'re my inspiration - Ramona',
    'Don\'t ever forget you\'re my happiness - Penelope',
    'Don\'t ever forget you\'re my everything - Your love',
    'I love to draw with you - Penelope',
    'I love to paint with you - Ramona',
    'I love to joke with you - Your love',
    'I love to cook with you - Penelope',
    'I love to bake with you - Ramona',
    'I love to be with you - Your love',
    'I love to collect eggs with you - Penelope',
    'I love to sew with you - Ramona',
    'I love to build our lives together - Your love',
    'Our snuggles are my heart and home - Penelope',
    'Our talks mean the world to me - Ramona',
    'Our time together is my favorite - Your love',
    'You make my breakfast when I\'m sleepy in the morning - Penelope',
    'You brush my hair when I\'m behind getting ready - Ramona',
    'You make my coffee when I\'m busy at work - Your love'
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
        }, 250)
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
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#666',
    },
    fortuneCookie: {
        width: 96,
        height: 96,
        marginBottom: 10,
    },
    fortuneModal: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fortuneText: {
        fontSize: 14,
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
        width: 400,
        height: 400,
        marginBottom: 0,
    },
});
