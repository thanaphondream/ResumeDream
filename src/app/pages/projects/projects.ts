import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Project {
  id: number;
  title: string;
  categoryLabel: string;
  description: string;
  longDescription?: string;
  image: string;
  images: string[];
  highlights: string[];
  technologies: string[];
  demoUrl?: string;
  githubFrontend?: string;
  githubBackend?: string;
  githubUrl?: string;
  featured?: boolean;
}

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  selectedProject = signal<Project | null>(null);
  activeCodeDropdown = signal<number | null>(null);
  modalCodeDropdown = signal<boolean>(false);
  currentImageIndex = signal<number>(0);

  projects = signal<Project[]>([

    {
      id: 1,
      title: 'ระบบสั่งอาหารออนไลน์ร้านก๋วยเตี๋ยวยายต๋อย',
      categoryLabel: 'Full Stack',
      description: 'เว็บแอปพลิเคชันสั่งอาหารออนไลน์สำหรับร้านก๋วยเตี๋ยวยายต๋อย พร้อมระบบจัดการเมนู ตะกร้าสินค้า และการเข้าสู่ระบบ',
      longDescription: 'โปรเจกต์พัฒนาระบบสั่งอาหารและจัดการร้านค้าแบบครบวงจร ออกแบบ UI/UX ให้ใช้งานง่าย สวยงาม ทันสมัย รองรับทั้งการสั่งอาหารออนไลน์ การเลือกหมวดหมู่เมนู ตะกร้าสินค้า และระบบ Authentication สำหรับสมาชิก',
      image: 'assets/img/projects/noodle_shop_front.jpg',
      images: [
        'assets/img/projects/noodle_shop_front.jpg',
        'assets/img/projects/noodle_shop2.png',
        'assets/img/projects/noodle_shop3.png',
        'assets/img/projects/noodle_shop4.png',

      ],


      highlights: [
        'ระบบสั่งอาหารและเลือกดูรายการเมนูแบบไดนามิก',
        'ระบบตะกร้าสินค้าและการคำนวณราคาแบบเรียลไทม์',
        'ดีไซน์ Responsive สวยงาม ใช้งานได้ลื่นไหลบนทุกขนาดหน้าจอ'
      ],
      technologies: ['NextJS', 'TypeScript', 'HTML5', 'CSS3', 'REST API', 'MySQL', 'Supabase'],
      demoUrl: 'https://dream-menu-food.vercel.app/u',
      githubFrontend: 'https://github.com/thanaphondream/menu_fj',
      githubBackend: 'https://github.com/thanaphondream/menu_bj/tree/main',
      featured: true,
    },

    {
      id: 2,
      title: 'เว็บฟังเพลง(ListenMusic)',
      categoryLabel: 'Full Stack',
      description: 'เว็บแอปพลิเคชันฟังเพลงและสตรีมมิ่งไฟล์เสียงบนเซิร์ฟเวอร์ พร้อมระบบค้นหา จัดการเพลย์ลิสต์ และควบคุมการเล่นเพลงแบบเรียลไทม์',
      longDescription: 'โปรเจกต์พัฒนาระบบเว็บสตรีมมิ่งเพลงบนเซิร์ฟเวอร์ (Music Streaming Server) พัฒนาฝั่ง Frontend ด้วย Angular และ TypeScript ออกแบบ UI สไตล์ Dark Theme ที่ทันสมัย พร้อมระบบเครื่องเล่นเพลงที่รองรับการเล่น/หยุด ปรับระดับเสียง และเลื่อนแทร็กเพลง ส่วน Backend พัฒนาด้วย Go (Golang) มอบความเร็วสูงในการสตรีมข้อมูลเสียง (Audio Streaming) และจัดการ API สำหรับระบบศิลปิน (Artists), เพลย์ลิสต์ (Playlist) และการอัปโหลดเพลง (Upload)',
      image: 'assets/img/projects/music_stream_mac.jpg',
      images: [
        'assets/img/projects/music_stream_mac.jpg',
        'assets/img/projects/music_stream_ui.png',
        'assets/img/projects/music_stream_mac2.png', 
        'assets/img/projects/music_stream_mac3.png', 
      ],

      highlights: [
        'ระบบเครื่องเล่นเพลง (Audio Player) เล่น/หยุด ปรับระดับเสียง และแสดงแทร็กแบบเรียลไทม์',
        'ระบบสตรีมมิ่งไฟล์เสียงประสิทธิภาพสูง รองรับ Concurrency ด้วย Go (Golang)',
        'ระบบจัดเก็บเพลย์ลิสต์ (Add to Playlist), การกดถูกใจ (Like) และแสดงสถิติผู้เข้าฟัง',
        'เมนูค้นหาศิลปิน (Artists) และระบบอัปโหลดไฟล์เพลงใหม่เข้าสู่เซิร์ฟเวอร์ (Upload)'
      ],
      technologies: ['Angular', 'Go Lang', 'TypeScript', 'Supabase', 'REST API', 'HTML5', 'CSS3'],
      demoUrl: 'https://song-forns.vercel.app',
      githubFrontend: 'https://github.com/thanaphon44881/SongForns.git',
      githubBackend: 'https://github.com/thanaphondream/SongGo.git',
      featured: true,
    },
  ]);

  toggleCodeDropdown(event: MouseEvent, projectId: number) {
    event.stopPropagation();
    if (this.activeCodeDropdown() === projectId) {
      this.activeCodeDropdown.set(null);
    } else {
      this.activeCodeDropdown.set(projectId);
    }
  }

  toggleModalCodeDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.modalCodeDropdown.update(v => !v);
  }

  openDetails(project: Project, initialIndex = 0) {
    this.selectedProject.set(project);
    this.currentImageIndex.set(initialIndex);
    this.modalCodeDropdown.set(false);
    document.body.style.overflow = 'hidden';
  }

  closeDetails() {
    this.selectedProject.set(null);
    this.currentImageIndex.set(0);
    this.modalCodeDropdown.set(false);
    document.body.style.overflow = 'auto';
  }

  selectImage(index: number, event?: MouseEvent) {
    event?.stopPropagation();
    this.currentImageIndex.set(index);
  }

  nextImage(event?: MouseEvent) {
    event?.stopPropagation();
    const proj = this.selectedProject();
    if (!proj || !proj.images || proj.images.length <= 1) return;
    this.currentImageIndex.update(idx => (idx + 1) % proj.images.length);
  }

  prevImage(event?: MouseEvent) {
    event?.stopPropagation();
    const proj = this.selectedProject();
    if (!proj || !proj.images || proj.images.length <= 1) return;
    this.currentImageIndex.update(idx => (idx - 1 + proj.images.length) % proj.images.length);
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.activeCodeDropdown.set(null);
    this.modalCodeDropdown.set(false);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.selectedProject()) {
      if (event.key === 'ArrowRight') {
        this.nextImage();
      } else if (event.key === 'ArrowLeft') {
        this.prevImage();
      } else if (event.key === 'Escape') {
        this.closeDetails();
      }
    } else {
      if (event.key === 'Escape') {
        this.activeCodeDropdown.set(null);
      }
    }
  }
}

