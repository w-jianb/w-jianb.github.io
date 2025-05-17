import supabase from './supabase-client.js'

document.addEventListener('DOMContentLoaded', async () => {
  // 检查当前用户会话
  const { data: { user } } = await supabase.auth.getUser()
  
  // 渲染认证状态
  renderAuthStatus(user)
  
  // 加载页面内容
  loadPages()
})

async function loadPages() {
  const { data: pages, error } = await supabase
    .from('pages')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('加载内容失败:', error)
    return
  }
  
  renderPages(pages)
}

function renderPages(pages) {
  const contentEl = document.getElementById('content')
  contentEl.innerHTML = pages.map(page => `
    <article class="page">
      <h2>${page.title}</h2>
      <div class="page-content">${page.content}</div>
    </article>
  `).join('')
}

function renderAuthStatus(user) {
  const authContainer = document.getElementById('auth-container')
  
  if (user) {
    authContainer.innerHTML = `
      <p>欢迎, ${user.email}</p>
      <button id="sign-out">退出</button>
    `
    document.getElementById('sign-out').addEventListener('click', signOut)
  } else {
    authContainer.innerHTML = `
      <button id="sign-in">GitHub登录</button>
    `
    document.getElementById('sign-in').addEventListener('click', signInWithGitHub)
  }
}

async function signInWithGitHub() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github'
  })
  
  if (error) {
    console.error('登录失败:', error)
    alert('登录失败，请重试')
  }
}

async function signOut() {
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    console.error('退出失败:', error)
  } else {
    location.reload()
  }
}
