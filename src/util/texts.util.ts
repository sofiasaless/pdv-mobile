export default function dataFirebaseParaDataNormal(dataFirebase: any) {
  if (dataFirebase === '') {
    return ''
  }
  return new Date(dataFirebase.seconds * 1000).toLocaleTimeString()
}