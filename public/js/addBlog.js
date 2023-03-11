
const addBlogButtonHandler = async (event) => {
  event.preventDefault()
 const title = document.querySelector('#title-name').value.trim()
  const body = document.querySelector('#content').value.trim()

  if (title && body) {
    const response = await fetch('/api/dashboard', {
      method: 'POST',
      body: JSON.stringify({ title, body }),
      headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
      document.location.replace('api/dashboard')
    } else {
      alert(response.statusText)
    }
  }
}

const deleteBlogButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id')

    const response = await fetch(`/api/dashboard/${id}`, {
      method: 'DELETE',
      // headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      location.reload()
    } else {
      alert('Failed to delete the blog.')
    }
  }
}
document.querySelector('#submit-blog').addEventListener('click', addBlogButtonHandler)

const deleteBtn = document.querySelectorAll('.del-blog')
for (i of deleteBtn) {
  i.addEventListener('click', deleteBlogButtonHandler)
}
