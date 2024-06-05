import { Text, TouchableOpacity, View } from 'react-native';

import { useAuth } from '../contexts/AuthContext';

export function Home() {
    const { onLogout } = useAuth();

    return (
        <View>
            <Text>Home</Text>
            <TouchableOpacity onPress={onLogout} style={{ backgroundColor: 'blue' }}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}
