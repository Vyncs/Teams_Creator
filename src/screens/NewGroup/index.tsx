import { Header } from '@components/Header'
import * as S from './styles'
import { Highlight } from '@components/HighLight'
import { Button } from '@components/Buttons'
import { Input } from '@components/Input'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { groupCreate } from '@storage/group/groupCreate'
import { AppError } from '@utils/AppError'
import { Alert } from 'react-native'



export function NewGroup(){
  const [group, setGroup] = useState('');

  const navigation = useNavigation();

  async function handleNew(){
    try{
      if(group.trim().length === 0){
        return Alert.alert('Novo Grupo', 'Informe o nome do grupo.')
      }
      await groupCreate(group)
      navigation.navigate('players', { group });
    }catch (error){
      if(error instanceof AppError) 
      {
        Alert.alert('Novo Grupo', error.message)
      }else{
        Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo.')
        console.log(error);
      }

    }
  }

  return(
    <S.Container>
      <Header showBackButton/>

      <S.Content>
        <S.Icon />

        <Highlight 
        title='Nova Turma'
        subtitle='crie a turma para adicionar as pessoas'
        />

        <Input 
          placeholder='Nome da turma'
          onChangeText={setGroup}
        />

        <Button
        title='Criar'
        style={{ marginTop: 20}}
        onPress={handleNew}
        />
    
      </S.Content>
    </S.Container>
  )
}