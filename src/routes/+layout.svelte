<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();

	let resizing = false;
	let sidebar: HTMLTableCellElement;
	let content: HTMLTableCellElement;

	function startResize(e: MouseEvent) {
		resizing = true;
	}

	function doResize(e: MouseEvent) {
		if (resizing) {
			const sidebarWidth = e.clientX - sidebar.getBoundingClientRect().left;
			sidebar.style.width = `${sidebarWidth}px`;
			content.style.width = `${1200 - sidebarWidth}px`;
		}
	}

	function stopResize() {
		resizing = false;
	}
</script>

<svelte:window on:mousemove={doResize} on:mouseup={stopResize} />

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<table width="1200" align="center" cellpadding="0" cellspacing="0" border="0" class="main-table">
	<tbody>
		<tr>
			<td colspan="3" class="header">
				<img src="/img/header.png" alt="DIONYSUS" class="header-img" />
			</td>
		</tr>
		<tr>
			<td bind:this={sidebar} width="200" valign="top" class="sidebar">
				<h3 class="sidebar-title">Temple Navigation</h3>

				<ul class="sidebar-nav">
					<li class="sidebar-nav-item">
						<a href="/" class="sidebar-nav-link">✦ Home</a>
					</li>
					<li class="sidebar-nav-item">
						<a href="/about" class="sidebar-nav-link">✦ Proxy</a>
					</li>
					<li class="sidebar-nav-item">
						<a href="/services" class="sidebar-nav-link">✦ Games</a>
					</li>
				</ul>
			</td>
			<td class="resizer" on:mousedown={startResize}></td>
			<td bind:this={content} width="800" valign="top" class="content">
				<div class="content-inner">
					{@render children()}
				</div>
			</td>
		</tr>
		<tr>
			<td colspan="3" class="footer"> © 2001 DIONYSUS </td>
		</tr>
	</tbody>
</table>
