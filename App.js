import { useState, useEffect } from "react";
import { Audio } from "expo-av";
import * as Haptics from 'expo-haptics';

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
    'I love to build our lives together - Your love'
]

const fortuneCookieCrunchSound = new Audio.Sound()
const fortuneCookieBagSound = new Audio.Sound()

export default function App() {
    const [showCookie, setShowCookie] = useState(false)
    const [fortune, setFortune] = useState('help yourself to some fortune cookies for the heart')
    const [caption, setCaption] = useState('')

    useEffect( () => {
        const loadAudio = async () => {
            await fortuneCookieBagSound.loadAsync(require('./assets/sounds/fortuneCookieBag03.mp3'))
                .then(() => {
                    console.log('fortuneCookieBag sound loaded')
                })
                .catch((error) => {
                    console.log('error loading fortuneCookieBag sound', error)
                })
            await fortuneCookieCrunchSound.loadAsync(require('./assets/sounds/fortuneCookieCrunch01.mp3'))
                .then(() => {
                    console.log('fortuneCookieCrunch sound loaded')
                })
                .catch((error) => {
                    console.log('error loading fortuneCookieCrunch sound', error)
                })
        }

        loadAudio()
            .then(() => console.log('all audio loaded'))
            .catch((error) => console.log('error loading audio', error))

        setCaption('LONG PRESS BAG FOR COOKIE')
    }, [])

    const handleBagLongPress = async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        await fortuneCookieBagSound.replayAsync()
    }

    const handleBagLongPressOut = async () => {
        await fortuneCookieBagSound.stopAsync()
        setShowCookie(true)
        setCaption('BREAK COOKIE FOR FORTUNE')
    }

    const handleCookiePress = async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        await fortuneCookieCrunchSound.replayAsync()
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
                        onPressOut={handleBagLongPressOut}>
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
