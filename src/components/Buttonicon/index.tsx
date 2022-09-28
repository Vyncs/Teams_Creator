import {ButtonIconTypeStyleProps, Container , Icons} from './styles'
import { TouchableOpacityProps } from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'

type Props = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap;
  type?: ButtonIconTypeStyleProps
}

export function ButtonIcon({icon , type= 'PRIMARY', ...rest} : Props){
  return (
    <Container {...rest}>
      
      <Icons
        name={icon}
        type={type}
      />
    </Container>
  )
}