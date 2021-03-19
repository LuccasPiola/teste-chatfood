interface IProps {
  number: number
  withLocale: string
  andStyle: {
    style: string
    currency: string
    maximumFractionDigits?: number
  }
}

export const transformNumberIntoMoney = ({
  number,
  withLocale,
  andStyle,
}: IProps): string => {
  const intlNumber = new Intl.NumberFormat(withLocale, { ...andStyle })
  return intlNumber.format(number)
}
