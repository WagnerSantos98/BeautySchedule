import styled from 'styled-components/native';
import theme from './theme.json';

import {
    Text as TextPaper,
    Title as TitlePaper,
    Badge as BadgePaper,
    Button as ButtonPaper,
    TextInput as TextInputPaper,
} from 'react-native-paper';

import LinearGradient from 'react-native-linear-gradient';

export const Cover = styled.ImageBackground.attrs((props) => ({
    source: {
        uri: props.image,
    }
}))`
    width: ${(props) => props.width || '60px'};
    height: ${(props) => props.height || '70px'};
    margin: ${(props) => props.spacing || '0 10px 0 0'};
    border-radius: ${(props) => (props.circle ? props.width : '3px')};
    border: ${(props) => props.border || 'none'};
    background-color: ${theme.colors.muted};
`;

export const GradientView = styled(LinearGradient).attrs((props) => ({
    colors: props.colors
}))`
    flex: 1;
    padding: ${(props) => (props.hasPadding ? '20px' : '0px')};
    justify-content: ${(props) => props.justify || 'flex-start'};
`;

export const Badge = styled(BadgePaper)`
    align-self: flex-start;
    font-size: 16px;
    width: auto;
    height: auto;
    padding: 5px 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    background: ${(props) => theme.colors[props.color || 'danger']};
`;

export const Title = styled(TitlePaper)`
    color: ${(props) => theme.colors[props.color || 'dark']};
    font-size: ${(props) => (props.small ? '22px' : '30px')};
    padding: ${(props) => (props.hasPadding ? '20px' : '0px')};
    letter-spacing: -0.8px;
    line-height: ${(props) => (props.small ? '22px' : '30px')};
    text-align: ${(props) => props.align || 'left'};
`;

export const Text = styled(TextPaper)`
    color: ${(props) => theme.colors[props.color || 'muted']};
    font-size: ${(props) => (props.small ? '13px' : '17px')};
    font-family: ${(props) => (props.bold ? 'Ubuntu-Bold' : 'Ubuntu-Light')};
    margin: ${(props) => props.spacing || 0};
    padding: ${(props) => (props.hasPadding ? '20px' : '0px')};
`;