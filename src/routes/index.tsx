import { useContext } from 'react';
import { useTheme, Box } from 'native-base';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { AuthContext } from '@contexts/AuthContext';
import { useAuth } from '@hooks/useAuth';

export function Routes() {

    const { colors } = useTheme();

    const { user } = useAuth();

    console.log("USUÁRIO LOGADO =>", user);

    const contextData = useContext(AuthContext);

    console.log("USUÁRIO LOGADO =>", contextData)

    const theme = DefaultTheme;
    theme.colors.background = colors.gray[700];

    return (
        <Box flex={1} bg="gray.700">
            <NavigationContainer theme={theme}>
                <AuthRoutes />
            </NavigationContainer>
        </Box>
    );
}