import styled from 'styled-components/native';
import theme from './theme.json';
import util from '../util';
import { StyleSheet, Dimensions } from 'react-native';

import {
    Text as TextPaper,
    Title as TitlePaper,
    Badge as BadgePaper,
    Button as ButtonPaper,
    TextInput as TextInputPaper,
} from 'react-native-paper';

import { TouchableOpacity } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient';


export const Box = styled.View`
    flex: 1;
    flex-wrap: ${(props) => props.wrap || 'nowrap'};
    flex-direction: ${(props) => props.direction || 'row'};
    justify-content: ${(props) => props.justify || 'flex-start'};
    align-items: ${(props) => props.align || 'flex-start'};
    width: ${(props) => props.width || '100%'};
    height: ${(props) => props.height || 'auto'};
    max-height: ${(props) => props.height || 'auto'};
    padding: ${(props) => (props.hasPadding ? '20px' : '0px')};
    padding-bottom: ${(props) => props.removePaddingBottom ? '0' : props.hasPadding ? '20px' : '0px'};
    margin: ${(props) => props.spacing || 0};
    border-radius: ${(props) => props.radius || 0};
    border: ${(props) => props.border || 'none'};
    background: ${(props) => theme.colors[props.background] || props.background || 'transparent'};
`;

export const Touchable = styled(TouchableOpacity)`
    flex-direction: ${(props) => props.direction || 'row'};
    justify-content: ${(props) => props.justify || 'flex-start'};
    align-items: ${(props) => props.align || 'flex-start'};
    width: ${(props) => props.width || '100%'};
    height: ${(props) => props.height || 'auto'};
    padding: ${(props) => (props.hasPadding ? '20px' : '0px')};
    margin: ${(props) => props.spacing || 0};
    background: ${(props) => theme.colors[props.background] || props.background || 'transparent'};
    border-radius: ${(props) => props.rounded || 0};
    border: ${(props) => props.border || 'none'};
`;

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
    overflow: hidden;
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

export const Button = styled(ButtonPaper)`
  background-color: ${(props) => theme.colors[props.background] || props.background};
  width: ${(props) => (props.block ? '100%' : 'auto')};
  border-radius: 5px;
  labelStyle: {
    color: ${(props) => theme.colors[props.textColor || 'light']};
    letter-spacing: 0;
  }
`;

export const TextInput = styled(TextInputPaper).attrs({
    mode: 'outlined',
    theme: {
        colors: {
            placeholder: util.toAlpha(theme.colors.muted, 30),
        }
    }
})`
    height: 45px;
    width: 100%;
    font-size: 15px;
    background: ${theme.colors.light};
`;

export const Spacer = styled.View`
    width: 100%;
    height: ${(props) => props.size || '10px'}
`;


//Bottom theme personalizado
export const DIMENSIONS = Dimensions.get('window')

export const styles = StyleSheet.create({
    container: {
        height: DIMENSIONS.height - 30,
        backgroundColor: "#fff",
    }
})
