import * as S from '@components/HighLight/styles'

type Props = {
  title: string;
  subtitle: string;
}

export function Highlight({title, subtitle} : Props) {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Subtitle>{subtitle}</S.Subtitle>
    </S.Container>
  )
}


